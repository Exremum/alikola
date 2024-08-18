document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.getElementById("projects");
    const showError = (message) => {
        projectsContainer.innerHTML = `<p class="text-center text-danger">${message}</p>`;
    };

    fetch("https://api.github.com/users/Exremum/repos")
        .then((res) => res.json())
        .then((repos) => {
            projectsContainer.innerHTML = "";
            repos.forEach((repo) => {
                if (repo.private) return;
                const date = new Date(repo.updated_at).toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
                projectsContainer.innerHTML += `
                    <div class="project-block glow-block">
                        <h3>${repo.name}</h3>
                        <a href="${repo.html_url}" target="_blank" class="project-link">
                            Просмотр на GitHub
                        </a>
                        <p class="project-updated">Обновлено: ${date}</p>
                    </div>
                `;
            });
        })
        .catch((error) => {
            console.error(error);
            showError("Не удалось загрузить проекты. Пожалуйста, попробуйте позже.");
        });
});
