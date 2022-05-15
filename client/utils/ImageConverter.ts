export class ImageConverter {
    private static result: string;
    public static ConvertToString(image: File) {
        ImageConverter.Convert(image);
        return ImageConverter.result;
    }
    private static Convert(image: File) {
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = function () {
            ImageConverter.result = reader.result as string;
            return reader.result;
        };
    }
}
