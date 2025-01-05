export const formatDateTime = (time: string) => {
    return `${time.substring(5, 7)}/${time.substring(8, 10)} ${time.substring(11, 16)}`
}