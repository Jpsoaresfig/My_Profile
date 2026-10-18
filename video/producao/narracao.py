# -*- coding: utf-8 -*-
"""Gera a narração (uma faixa por segmento) com edge-tts e converte para WAV 48 kHz mono.

Uso: python narracao.py es|en|pt [--force]
"""
import asyncio, os, subprocess, sys
import edge_tts, imageio_ffmpeg
from roteiro import SEGMENTS, VOICES, RATE

LANG = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith("-") else "es"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "build", LANG, "narr")
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()


async def synth(seg):
    mp3 = os.path.join(OUT, seg["id"] + ".mp3")
    wav = os.path.join(OUT, seg["id"] + ".wav")
    if not os.path.exists(mp3) or "--force" in sys.argv:
        await edge_tts.Communicate(seg["tts_" + LANG], VOICES[LANG], rate=RATE).save(mp3)
    subprocess.run([FFMPEG, "-y", "-loglevel", "error", "-i", mp3, "-ac", "1", "-ar", "48000", wav], check=True)


async def main():
    os.makedirs(OUT, exist_ok=True)
    for seg in SEGMENTS:
        await synth(seg)
    print(LANG, "narração ok:", len(SEGMENTS), "segmentos")


asyncio.run(main())
