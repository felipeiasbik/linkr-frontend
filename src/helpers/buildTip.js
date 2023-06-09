function buildTip(users, name) {
  if (!users || users.length === 0) return 'Ninguém curtiu';
  const user = users.find((u) => u === name);
  if (user) {
    const user2 = users.find((u) => u !== name);
    const info = [];
    info.push(user);
    if (user2) info.push(user2);
    return `${info.join(', ').replace(name, 'Você')}`;
  }
  const info = users.slice(-2);
  return `${info.join(', ')}`;
}

export default buildTip;
