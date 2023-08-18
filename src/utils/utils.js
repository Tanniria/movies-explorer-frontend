export default function movieDuration (duration) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}ч${minutes}м`;
}
