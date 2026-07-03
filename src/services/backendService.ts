const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function wakeBackend() {
  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    await fetch(`${API_URL}/`, {
      method: "GET",
      cache: "no-store",
      signal: controller.signal,
    });
  } catch (err) {
    console.log("Backend warmup started...");
  } finally {
    clearTimeout(timeout);
  }
}