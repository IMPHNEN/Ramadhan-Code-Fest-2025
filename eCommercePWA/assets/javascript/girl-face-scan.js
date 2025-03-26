document.addEventListener("DOMContentLoaded", function () {
    let counter = 1;
    const counterElement = document.getElementById("counter");
    const modalElement = document.getElementById("successful");

    if (!counterElement || !modalElement) return; // Ensure elements exist

    const interval = setInterval(() => {
        if (counter <= 100) {
            counterElement.textContent = `${counter}%`;
            counter++;
        } else {
            clearInterval(interval);
            showModal();
        }
    }, 30);

    function showModal() {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();

        setTimeout(() => {
            window.location.href = "preferred-lang.html";
        }, 3000);
    }
});
