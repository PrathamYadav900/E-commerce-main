export interface Product {
    id : number; 
    title : string ; 
    description : string ;
    price : number ;
    image : string ;
    
}

export interface ProductDetails{
    id : number;
    name : string ; 
    image : string
    price : number;
    offers : string;
    highlights :string;
    specifications : string
}

export interface CartItem{
    id: number,
    name : string,
    description : string,
    price : number,
    image : string
}