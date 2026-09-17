
const originalUrlInput = document.getElementById("originalUrl");
const shortenBtn = document.getElementById("shortenBtn");

const result = document.getElementById("result");
const shortUrlInput = document.getElementById("shortUrl");

const copyBtn = document.getElementById("copyBtn");
const visitBtn = document.getElementById("visitBtn");

const message = document.getElementById("message");

let generatedShortUrl = "";

shortenBtn.addEventListener("click", async () => {
    const originalUrl = originalUrlInput.value.trim();

    if (!originalUrl) {
        message.textContent = "Please enter a URL.";
        return;
    }

    message.textContent = "";
    shortenBtn.disabled = true;
    shortenBtn.textContent = "Shortening...";

    try {
        const response = await fetch("/api/shorten", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                originalUrl: originalUrl
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
        }

        generatedShortUrl = data.shortUrl;

        shortUrlInput.value = generatedShortUrl;

        result.classList.remove("hidden");

        message.textContent = "URL shortened successfully!";

    } catch (error) {
        console.error(error);

        message.textContent = error.message;

        result.classList.add("hidden");

    } finally {
        shortenBtn.disabled = false;
        shortenBtn.textContent = "Shorten URL";
    }
});


copyBtn.addEventListener("click", async () => {

    if (!generatedShortUrl) {
        return;
    }

    try {
        await navigator.clipboard.writeText(generatedShortUrl);

        copyBtn.textContent = "Copied!";

        setTimeout(() => {
            copyBtn.textContent = "Copy";
        }, 1500);

    } catch (error) {
        console.error(error);

        message.textContent = "Failed to copy URL.";
    }
});


visitBtn.addEventListener("click", () => {

    if (!generatedShortUrl) {
        return;
    }

    window.open(generatedShortUrl, "_blank");
});