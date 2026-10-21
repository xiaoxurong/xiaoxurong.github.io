/* Progressive enhancement; all projects and native disclosures work without JS. */
(() => {
  const filters = [...document.querySelectorAll('[data-filter]')];
  const projects = [...document.querySelectorAll('[data-tracks]')];
  const status = document.querySelector('.filter-status');
  const compactGroup = document.querySelector('.compact-projects');
  const labels = { all: 'all', data: 'data constraints', efficient: 'efficient adaptation' };
  function showProjects(filter) {
    if (!(filter in labels)) return;
    let count = 0;
    projects.forEach(project => {
      const visible = filter === 'all' || project.dataset.tracks.split(' ').includes(filter);
      project.hidden = !visible;
      if (visible) count += 1;
    });
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
    compactGroup.hidden = ![...compactGroup.children].some(project => !project.hidden);
    status.textContent = filter === 'all' ? `Showing all ${count} projects` : `Showing ${count} projects related to ${labels[filter]}`;
  }
  filters.forEach(button => button.addEventListener('click', () => showProjects(button.dataset.filter)));
  document.querySelectorAll('[data-project-filter]').forEach(link => {
    link.addEventListener('click', () => showProjects(link.dataset.projectFilter));
  });
  document.querySelectorAll('a[href="#rift"]').forEach(link => {
    link.addEventListener('click', () => showProjects('efficient'));
  });
  document.getElementById('year').textContent = new Date().getFullYear();
})();
