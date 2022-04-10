// user
export interface IUser {
    id?: string,
    surname?: string,
    name?: string,
    fullname?: string,
    password?: string,
    email?: string,
    prevEmail?: string,
    phone?: string,
    home?: string,
    current_day?: string,
    isRegisterUser?: boolean,
    isLogin?: boolean
}

// ________________________

// jwt

export interface IResponseData {
    email?: string,
    id?: string,
    isLogin?: boolean,
    jwt_token?: string
}


// ________________________


// order, products

export interface INameProducts {
    id_product?: string,
    name_product?: string,
    price?: number,
    isStored?: boolean,
    isActive?: boolean
}

interface IOrder {
    id_order?: string,
    id_client?: string,
    name_order?: string,
    list?: INameProducts[],
    isExecuted?: boolean
}

interface ITypeOfProcess {
    id_process?: string,
    name_of_process?: string
}


export interface IOrderProduct extends IOrder, INameProducts, ITypeOfProcess { }

// ________________________