import os, socket, traceback
import httpx

print("--- getaddrinfo api.openai.com")
for fam, _, _, _, sa in socket.getaddrinfo("api.openai.com", 443):
    print("   ", fam.name, sa[0])

key = os.environ.get("OPENAI_API_KEY", "")
print("--- key present:", bool(key), "len", len(key))

for label, transport in (
    ("default", None),
    ("ipv4-only", httpx.HTTPTransport(local_address="0.0.0.0")),
):
    try:
        with httpx.Client(transport=transport, timeout=20) as c:
            r = c.get("https://api.openai.com/v1/models",
                      headers={"Authorization": "Bearer " + key})
        print(f"--- httpx {label}: {r.status_code}")
    except Exception:
        print(f"--- httpx {label}: FAILED")
        traceback.print_exc()
