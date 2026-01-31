document.querySelectorAll(".project").forEach(project => {
  project.addEventListener("mouseenter", () => {
    project.style.setProperty("--glow-inset", "-5px");
    project.style.setProperty("--blur", "20px");
  });

  project.addEventListener("mouseleave", () => {
    project.style.setProperty("--glow-inset", "0px");
    project.style.setProperty("--blur", "0px"); 
  });
});

document.querySelectorAll(".rgb").forEach(button => {
  button.addEventListener("mouseenter", () => {
    button.style.setProperty("--glow-inset", "-3px");
    button.style.setProperty("--blur", "5px");
  });
  button.addEventListener("mouseleave", () => {
    button.style.setProperty("--glow-inset", "0px");
    button.style.setProperty("--blur", "0px");
  });
});