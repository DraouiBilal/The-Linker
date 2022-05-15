import Swal, { SweetAlertIcon } from "sweetalert2";

const Alert = async (
    icon: SweetAlertIcon,
    title: string | HTMLElement | JQuery,
    text: string | undefined,
    footer: string | HTMLElement | JQuery | undefined = undefined
) => {
    if (footer === undefined) {
        await Swal.fire({
            icon: icon,
            title: title,
            text: text,
        });
    } else {
        await Swal.fire({
            icon: icon,
            title: title,
            text: text,
            footer: footer,
        });
    }
};
export default Alert;
