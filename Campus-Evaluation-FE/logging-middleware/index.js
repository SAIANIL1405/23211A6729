export function setLogToken(token) {}
export function LogDebug(stack, pkg, message) { console.debug(stack, pkg, message); }
export function LogInfo(stack, pkg, message) { console.info(stack, pkg, message); }
export function LogWarn(stack, pkg, message) { console.warn(stack, pkg, message); }
export function LogError(stack, pkg, message) { console.error(stack, pkg, message); }
export function LogFatal(stack, pkg, message) { console.error(stack, pkg, message); }
export default function Log() {}
