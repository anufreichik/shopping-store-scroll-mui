import React from 'react';
import Stack from '@mui/material/Stack';
import Product from './components/Product';
import {IProduct} from "./types/types";
import {throttle} from "./components/helper";
import {Container} from "@mui/material";
import {styled} from "@mui/material/styles";

//figma
//https://www.figma.com/file/OgbAT9SVwMPSK5fQfphZgq/Untitled-(Copy)?node-id=1%3A502
//https://www.notion.so/3bbc1b46b0ce454bbcd15446ca1117cc

const StyledContainer = styled(Container)(({theme}) => ({
    margin: '62px 0 55px 0',
    display:'flex',
    flexDirection:'row'
}));

// Генерируем набор тестовых товаров, чтобы не вбивать руками
let products: IProduct[] = Array(30)
    .fill(0)
    .map(() => ({
        title: 'Sofa Rubus with recliner',
        rating: Number((Math.random() * 5 + 1).toFixed(2)),
        price: {
            new: Math.round(Math.random() * 100000),
            old: Math.round(Math.random() * 100000),
            hot: !!Math.round(Math.random() * 1),
        },
        color: 'Black',
        material: 'Leather',
        size: 'w. 349 х h. 234 х d. 323',
        mechanism: 'French Recliner',
        seller: 'Laska Family',
    }));

const App: React.FC = () => {
    // max products
    const [maxCount, setMaxCount] = React.useState<number>(6);

    // ref na container with products that is going to be scrolled
    const wrapperRef = React.useRef<HTMLDivElement>(null);

    // declare funciton to follow scroll
    // Обязательно сохраняем одну и ту же ссылку у onScroll, чтобы позже удалить слушатель.
    // use useCallback
    // ###############
    //  use throttle

    const onScroll = React.useCallback(
        throttle((e: any) => {
            console.log('scroll');
            if (e.target) {
                const isEnd = e.target.scrollWidth - e.target.scrollLeft - 250 <= e.target.clientWidth;
                if (isEnd) {
                    // Если дошли до конца, показываем 1 новый товар
                    setMaxCount(count => count + 1);
                }
            }
        }, 50),
        [],
    );

    // Следим за изменениями переменных maxCount, onScroll.
    // Если макс. отображаемых товаров >= кол-во товаров
    // Удаляем слушатель скролла у основного блока wrapper
    React.useEffect(() => {
        console.log(maxCount)
        if (wrapperRef.current && maxCount >= products.length) {
            wrapperRef.current.removeEventListener('scroll', onScroll);
        }
    }, [maxCount, onScroll]);

    // Устанавливаем слушатель скролла на блок wrapper
    // И очищаем, если произошло демонтирование компонента App
    React.useEffect(() => {
        const {current} = wrapperRef;
        console.log(current)
        current?.addEventListener('scroll', onScroll);
        return () => {
            current?.removeEventListener('scroll', onScroll);
        };
    }, [onScroll]);

    return (
        <StyledContainer>
            <div>
                <div></div>
                <div>Rating</div>
                <div>Price</div>
                <div>Color</div>
                <div>Material</div>
                <div>Size</div>
                <div>Mechanism</div>
                <div>Seller</div>
            </div>
            <Stack direction="row" spacing={2} className='wrapper' ref={wrapperRef}>
                {products.slice(0, maxCount).map((obj: IProduct, index: number) => (
                    <Product key={index} {...obj} />
                ))}
            </Stack>
        </StyledContainer>
    );
};

export default App;
