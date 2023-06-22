export default function checkRole(slug) {
  const role = localStorage.getItem('role');
  return +role === slug;
}
