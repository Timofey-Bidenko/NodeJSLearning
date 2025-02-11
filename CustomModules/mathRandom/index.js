export default function(a, b) {
    const c = Math.min(a, b)
    const d = Math.max(a, b)
    return Math.round(Math.random() * (d - c))
}