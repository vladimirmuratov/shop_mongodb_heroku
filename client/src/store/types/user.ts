export type TUserState = {
    isAuth: boolean;
    isLoading: boolean;
    hasError: boolean;
    message: {};
    data: {
        _id: string;
        name: string;
        email: string;
        image: string;
        createdAt?: string;
        updatedAt?: string;
    }
}