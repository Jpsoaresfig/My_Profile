# -*- coding: utf-8 -*-
"""Exporta a versão para o portfólio (public/video): MP4 leve sem legenda queimada, poster e legendas WebVTT.

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


def srt_to_vtt(srt, vtt):
    # WebVTT usa ponto nos milissegundos; só as linhas de tempo mudam
    with open(srt, encoding="utf-8") as f:
        lines = [l.replace(",", ".") if "-->" in l else l for l in f.read().splitlines()]
    with open(vtt, "w", encoding="utf-8") as f:
        f.write("WEBVTT\n\n" + "\n".join(lines) + "\n")


if __name__ == "__main__":
    os.makedirs(PUBLIC, exist_ok=True)
    clean = os.path.join(BUILD, "video_limpo.mp4")
    subprocess.run([FF, "-y", "-loglevel", "error", "-i", clean, "-c:v", "libx264", "-preset", "slow", "-crf", "25",
                    "-maxrate", "2500k", "-bufsize", "5000k", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "128k",
                    "-movflags", "+faststart", os.path.join(PUBLIC, f"from-problems-to-software-{LANG}.mp4")], check=True)
    subprocess.run([FF, "-y", "-loglevel", "error", "-ss", str(POSTER_T), "-i", clean, "-frames:v", "1", "-vf", "scale=1280:-2",
                    "-q:v", "4", os.path.join(PUBLIC, f"from-problems-to-software-poster-{LANG}.jpg")], check=True)
    for key in ("es", "en", "pt"):
        srt = os.path.join(BUILD, f"web_{key}.srt")
        write_srt(SEGS, key, srt)
        srt_to_vtt(srt, os.path.join(PUBLIC, f"captions-{LANG}-{key}.vtt"))
    # capítulos do player: início de cada cena, com o mesmo recuo de 0.7 s usado no render
    starts = {}
    for x in SEGS:
        starts.setdefault(x["scene"], 0.0 if x["scene"] == 1 else round(max(x["start"] - 0.7, 0), 2))
    with open(CHAPTERS, "w", encoding="utf-8") as f:
        json.dump(dict(duration=TL["total"], chapters=[dict(scene=k, start=v) for k, v in sorted(starts.items())]), f, indent=2)
        f.write("\n")
    for f in sorted(os.listdir(PUBLIC)):
        print(f, os.path.getsize(os.path.join(PUBLIC, f)) // 1024, "KB")
