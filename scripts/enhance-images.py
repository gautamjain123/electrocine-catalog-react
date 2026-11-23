"""Studio-grade pass over the catalogue cut-outs.

The source plates are small (100-570 px) scans lifted from the printed
catalogue: soft, slightly flat and with noisy alpha fringes. This trims each
to its silhouette, cleans the alpha edge, upscales 2-4x, and lifts contrast,
colour and micro-detail so they read as product photography on the site.

    python scripts/enhance-images.py

Reads public/cat/pNN.png, writes public/cat/hd/pNN.webp. Originals are kept.
"""
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "cat"
OUT = SRC / "hd"
TARGET = 900  # longest side after upscaling
PAD = 0.04  # breathing room around the silhouette, as a fraction of size


def enhance(path: Path) -> Image.Image:
    im = Image.open(path).convert("RGBA")

    # 1. Kill near-transparent speckle left by the original background removal.
    r, g, b, a = im.split()
    a = a.point(lambda v: 0 if v < 24 else v)
    im = Image.merge("RGBA", (r, g, b, a))

    # 2. Trim to the silhouette, then pad evenly so every plate centres alike.
    box = a.getbbox()
    if box:
        im = im.crop(box)
    w, h = im.size
    p = int(max(w, h) * PAD)
    canvas = Image.new("RGBA", (w + 2 * p, h + 2 * p), (0, 0, 0, 0))
    canvas.paste(im, (p, p))
    im = canvas

    # 3. Upscale. Pillow resamples RGBA premultiplied, so edges do not go dark.
    scale = TARGET / max(im.size)
    if scale > 1:
        im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)

    rgb = im.convert("RGB")
    alpha = im.split()[3]

    # 4. Smooth the upscale's stair-stepping, then sharpen real detail back in.
    rgb = rgb.filter(ImageFilter.GaussianBlur(0.7))
    rgb = rgb.filter(ImageFilter.UnsharpMask(radius=3, percent=140, threshold=2))
    rgb = rgb.filter(ImageFilter.UnsharpMask(radius=1, percent=60, threshold=1))

    # 5. Tone: stretch levels on the product pixels only (not the transparent
    #    background, which would skew the histogram). One black/white point
    #    from luminance, applied to all three channels, so whites stay neutral
    #    instead of picking up a cast.
    mask = alpha.point(lambda v: 255 if v > 200 else 0)
    hh = rgb.convert("L").histogram(mask=mask)
    total = sum(hh) or 1
    lo, acc = 0, 0
    for i, n in enumerate(hh):
        acc += n
        if acc > total * 0.005:
            lo = i
            break
    hi, acc = 255, 0
    for i in range(255, -1, -1):
        acc += hh[i]
        if acc > total * 0.005:
            hi = i
            break
    lo = min(lo, 40)  # never crush a genuinely light product to grey
    span = max(hi - lo, 1)
    rgb = rgb.point([min(255, max(0, round((v - lo) * 255 / span))) for v in range(256)] * 3)
    rgb = ImageEnhance.Contrast(rgb).enhance(1.06)
    rgb = ImageEnhance.Color(rgb).enhance(1.05)

    # 6. Crisp-but-not-jagged alpha: blur then re-steepen the ramp.
    alpha = alpha.filter(ImageFilter.GaussianBlur(1.1))
    alpha = alpha.point(lambda v: 0 if v < 40 else 255 if v > 215 else round((v - 40) * 255 / 175))

    out = rgb.convert("RGBA")
    out.putalpha(alpha)
    return out


def main() -> None:
    OUT.mkdir(exist_ok=True)
    for path in sorted(SRC.glob("p*.png")):
        img = enhance(path)
        dest = OUT / (path.stem + ".webp")
        img.save(dest, "WEBP", quality=90, method=6)
        print(f"{path.name:8} -> {dest.relative_to(ROOT)}  {img.size[0]}x{img.size[1]}")


if __name__ == "__main__":
    main()
