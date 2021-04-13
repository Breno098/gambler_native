import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';

import App from '../../../components/App';
import Button from '../../../components/Button';
import BreadCrumb from '../../../components/BreadCrumb';
import Table from '../../../components/Table';
import TableRow from '../../../components/TableRow';
import TableCell from '../../../components/TableCell';
import TablePaginator from '../../../components/TablePaginator';

export default function Stadium({ route }) {

    const navigation = useNavigation();

    const [stadia, setStadia] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [errorLoading, setErrorLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        loadList();
    }, [route?.params]);

    const loadList = async () => {
        setPage(1);
        setStadia([]);
        setLoading(true);
        setErrorLoading(false);

        const bodyRequest = {
            filters: route?.params.filters, 
            orders: route?.params.orders
        }

        await api.post('filter/stadium', bodyRequest).then(response => {
            setStadia(response.data.stadia);
            setLoading(false);
        }).catch((error) => {
            console.log(error.response.data)
            setLoading(false);
            setErrorLoading(true)
        })
    }

    return (
        <App style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <BreadCrumb
                itens={[{
                    label: 'Cadastros',
                    route: 'Registrations'
                }, {
                    label: 'Estádios',
                }]}
            />

            <Table 
                style={{ height: 600 }} 
                loading={loading}
                error={errorLoading}
                refresh={loadList}
                title="Estádios"
                actions={[{
                    icon: 'filter', 
                    onPress: () => navigation.navigate('FilterStadium', {
                        filters: route.params.filters ?? '', 
                        orders: route.params.orders ?? true
                    })
                }]}
            >
                <TableRow>
                    <TableCell text={'Nome'} type={'title'}/>
                    <TableCell text={'País'} type={'title'}/>
                    <TableCell text={''} type={'title'}/>
                </TableRow>
                { stadia
                    .slice(
                        (page - 1) * perPage, 
                        (page - 1) * perPage + perPage
                    )
                    .map(stadium => (
                    <TableRow key={stadium.id}>
                        <TableCell text={stadium.name} />
                        <TableCell text={stadium.country.name} />
                        <TableCell>
                            <Button
                                style={{ height: 35, marginBottom: 18, width: 50 }}
                                color="rgba(0, 255, 0, 0.5)"
                                icon="edit"
                                onPress={() => {
                                    navigation.navigate('FormStadium', { stadium })
                                }}
                            /> 
                        </TableCell>
                    </TableRow>
                ))}
                
            </Table>
            
            <TablePaginator
                rows={stadia.length}
                numberOfPages={stadia.length / perPage}
                atualPage={page}
                next={() => page < (stadia.length / perPage) ? setPage(page + 1) : null }
                previous={() => page > 1 ? setPage(page - 1) : null }
            />

            <Button
                label="Adicionar"
                color="rgba(0, 255, 0, 0.5)"
                icon="plus"
                onPress={() => {
                    navigation.navigate('FormStadium')
                }}
                style={{
                    width: '95%'
                }}
            />   
        </App>
  );
}