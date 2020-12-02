/**
 * 生成32位uuid
 */
export function uuid () {
  const len = len || 32;
  const chars = 'ABCDEF0123456789';
  const maxPos = chars.length;
  let pwd = '';
  for (var i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }

  return pwd
}
