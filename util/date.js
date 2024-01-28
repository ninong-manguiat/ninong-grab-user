export const getDateTimeNow = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var mnt = today.getMinutes();

    return {
        d: `${mm}-${dd}-${yyyy}`,
        t: `${hh}:${mnt}`
    }
}