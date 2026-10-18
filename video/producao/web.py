# -*- coding: utf-8 -*-
"""Exporta o que o portfólio usa: poster (public/video), capítulos (src/data/film-chapters.json) e SRT por idioma em build/.
O vídeo em si fica no YouTube (uma versão por idioma, com legenda queimada; ids em src/data/profile.js).

Uso: python web.py es   (requer build/<lang>/video_limpo.mp4 gerado por render.py)
"""
import json, os, subprocess, sys
import imageio_ffmpeg

from timeline import write_srt

LANG = sys.argv[1] if len(sys.argv) > 1 else "es"
HERE = os.path.dirname(os.path.abspath(__file__))
BUILD = os.path.join(HERE, "build", LANG)
SITE = os.path.dirname(os.path.dirname(HERE))
PUBLIC = os.path.join(SITE, "public", "video")
CHAPTERS = os.path.join(SITE, "src", "data", "film-chapters.json")
FF = imageio_ffmpeg.get_ffmpeg_exe()

with open(os.path.join(BUILD, "timeline.json"), encoding="utf-8") as fh:
    TL = json.load(fh)
SEGS = TL["segments"]
POSTER_T = next(x["start"] for x in SEGS if x["id"] == "who1") - 2.0  # nome já revelado na abertura


if __name__ == "__main__":
    os.makedirs(PUBLIC, exist_ok=True)
    clean = os.path.join(BUILD, "video_limpo.mp4")
    subprocess.run([FF, "-y", "-loglevel", "error", "-ss", str(POSTER_T), "-i", clean, "-frames:v", "1", "-vf", "scale=1280:-2",
                    "-q:v", "4", os.path.join(PUBLIC, f"from-problems-to-software-poster-{LANG}.jpg")], check=True)
    for key in ("es", "en", "pt"):
        srt = os.path.join(BUILD, f"web_{key}.srt")
        write_srt(SEGS, key, srt)
    # capítulos do player: início de cada cena, com o mesmo recuo de 0.7 s usado no render
    starts = {}
    for x in SEGS:
        starts.setdefault(x["scene"], 0.0 if x["scene"] == 1 else round(max(x["start"] - 0.7, 0), 2))
    with open(CHAPTERS, "w", encoding="utf-8") as f:
        json.dump(dict(duration=TL["total"], chapters=[dict(scene=k, start=v) for k, v in sorted(starts.items())]), f, indent=2)
        f.write("\n")
    for f in sorted(os.listdir(PUBLIC)):
        print(f, os.path.getsize(os.path.join(PUBLIC, f)) // 1024, "KB")
