export class AppError {
  message?: string;
  detail?: {
    ar: string;
    en: string;
  };
  type?: string;

  static from(error: any): AppError {
    const { message, detail, type } = error;
    const appError = new AppError();
    appError.message = message;
    appError.detail = detail;
    appError.type = type;
    return appError;
  }

  getTranslatedMessage(): string {
    // TODO check the browser language and return the appropriate translation
    let isArabic = true;
    return (isArabic ? this.detail?.ar : this.detail?.en)!;
  }
}

