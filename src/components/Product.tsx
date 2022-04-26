import React from 'react';
import {IProduct} from "../types/types";

import {styled} from '@mui/material/styles';
import tumbaImg from '../assets/tumba.png';
import heartSvg from '../assets/heart.svg';
import {Button} from "@mui/material";
import {ShoppingCart} from "@mui/icons-material";


const Item = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: '14px',
    minWidth: '204px',
    maxWidth: '230px',
}));

const StyledProductContainer = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column'
}));
const StyledImageDiv = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}));


const ProductImageContainer = styled('div')(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f4f2ee',
    mixBlendMode: 'normal',
    borderRadius: '10px',
    width: '180px',
    height: '180px',
    marginBottom: '15px',
    "img": {mixBlendMode: "darken"}
}));

const CartButton = styled(Button)(({theme}) => ({
    color: '#ffffff',
    height: '35px',
    width: '117px',
    backgroundColor: '#009900',
    '&:hover': {
        backgroundColor: '#009900',
    },
    cursor: 'pointer'
}));

const Product: React.FC<IProduct> = ({
                                         title,
                                         rating,
                                         price,
                                         color,
                                         material,
                                         size,
                                         mechanism,
                                         seller,
                                     }) => {
    return (
        <Item>
            <StyledProductContainer>

                <div>
                    <StyledImageDiv>
                        <ProductImageContainer>
                            <img width="148" src={tumbaImg} alt="Тумба"/>
                        </ProductImageContainer>
                        <h5>{title}</h5>
                    </StyledImageDiv>
                    <div>
                        {/*<Stars count={Math.floor(rating)} />*/}
                        <b>{rating}</b>
                    </div>
                    <div>
                        <span>{price.new} Р</span>
                        <s>{price.old} Р</s>
                    </div>
                    <div>{color}</div>
                    <div>{material}</div>
                    <div>{size}</div>
                    <div>{mechanism}</div>
                    <div>
                        <a href="/">{seller}</a>
                    </div>
                    <div>
                        <Button variant='outlined' sx={
                            {
                                border: '2px solid #ff9f9f',
                                width: '51px',
                                height: '35px',
                                marginRight: '10px'
                            }
                        }>
                            <img src={heartSvg} alt="Heart"/>
                        </Button>
                        <CartButton startIcon={<ShoppingCart/>}>
                            Buy
                        </CartButton>

                    </div>
                </div>
            </StyledProductContainer>
        </Item>
    );
};

export default Product;
