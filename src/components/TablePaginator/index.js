import React, { useState } from 'react';
import { View, FlatList } from 'react-native';

import SlideListEdit from '../SlideListEdit';
import Button from '../Button';
import { useEffect } from 'react/cjs/react.development';

export default function TablePaginator({ data, renderItem, itensPerPage}) {

    const [pages, setPages] = useState(0);
    const [datas, setDatas] = useState([]);
    const [atualPage, setAtualPage] = useState(0);

    const next = () => {
        if(atualPage === pages.length - 1){
            return;
        }
    }

    const paginator = (type) => {
        let aP = type === 'next' ? atualPage + 1 : atualPage - 1;

        setAtualPage(aP);
        setDatas([]);

        let array = [];
        let index = (aP * 10)
        while(data[index + 1]){
            array.push(data[index++])
        }

        setDatas(array)
    }

    const previous = async () => {
        if(atualPage === 1){
            let array = []
            setDatas([]);
            for (let index = 0; index < 9; index++) {
                array.push(data[index])
            }
            setDatas(array)
            setAtualPage(0);
            return;
        } 

        if(atualPage === 0){
            return;
        }

        let aP = atualPage - 1;

        setAtualPage(aP);
        setDatas([]);

        let array = [];
        let index = (aP * 10)
        while(data[index - 1]){
            array.push(data[index--])
        }

        setDatas(array)
    }

    const init = () => {
        let count = data.length;
        let pages = [];
        let index = 0;
        while(count > 0){
            pages.push([index++])
            count = count - 10;
        }
        setPages(pages);

        let array = []
        setDatas([]);
        for (let index = 0; index < 9; index++) {
            array.push(data[index])
        }
        setDatas(array)
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <View style={{ width: '100%', height: '100%', justifyContent: 'center'}}>
            <Button
                label={'Total de paginas: ' + pages.length}
                style={{ width: '90%', margin: 10 }}
            />

            <Button
                label={'Total de registros: ' + data.length}
                style={{ width: '90%', margin: 10 }}
            />

            <Button
                label={'Pagina atual: ' + atualPage}
                style={{ width: '90%', margin: 10 }}
            />

            <FlatList
                data={datas}    
                renderItem={renderItem}
            />
            <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between',  height: '10%', marginTop: 15, marginLeft: 15 }}>
                    <Button
                        label="Anterior"
                        style={{ width: '25%' }}
                        onPress={() => previous()}
                    />
                    <Button
                        label="Proximo"
                        style={{ width: '25%' }}
                        onPress={() => next()}
                    />
                {/* {
                    pages
                    ?
                    pages.map(page => ( 
                        <Button
                            label={page}
                            style={{ width: '25%' }}
                        />
                    ))
                    :
                    null
                } */}
            </View>

        </View>
    );
}