import re, zlib, sys
from pathlib import Path
path = Path("Yuhe_Yang_Resume.pdf")
data = path.read_bytes()
pattern = re.compile(rb'stream\r?\n(.*?)\r?\nendstream', re.S)
segments = []
for m in pattern.finditer(data):
    stream = m.group(1)
    decompressed = None
    for wbits in (15, -15):
        try:
            decompressed = zlib.decompress(stream, wbits)
            break
        except Exception:
            continue
    if decompressed is None:
        continue
    buf = decompressed.decode('latin1', errors='ignore')
    i = 0
    while i < len(buf):
        if buf[i] == '(':
            i += 1
            chunk = []
            depth = 1
            while i < len(buf) and depth:
                ch = buf[i]
                if ch == '\\':
                    if i + 1 < len(buf):
                        chunk.append(buf[i+1])
                        i += 2
                        continue
                    else:
                        break
                elif ch == '(':
                    depth += 1
                    chunk.append(ch)
                    i += 1
                    continue
                elif ch == ')':
                    depth -= 1
                    if depth == 0:
                        i += 1
                        break
                    chunk.append(ch)
                    i += 1
                    continue
                else:
                    chunk.append(ch)
                    i += 1
            text = ''.join(chunk)
            text = text.replace('\r', ' ').replace('\n', ' ')
            text = re.sub(r'\s+', ' ', text).strip()
            if text:
                segments.append(text)
        else:
            i += 1
cleaned = []
last = None
for seg in segments:
    if seg == last:
        continue
    last = seg
    cleaned.append(seg)
sys.stdout.reconfigure(encoding='utf-8')
print('\n'.join(cleaned))
