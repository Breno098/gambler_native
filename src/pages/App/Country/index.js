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
import Card from '../../../components/Card';
import CardBody from '../../../components/CardBody';
import CardFooter from '../../../components/CardFooter';

export default function Country({ route }) {

    const navigation = useNavigation();

    const [countries, setCountries] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [errorLoading, setErrorLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        loadList();
    }, [route?.params]);

    const loadList = async () => {
        setPage(1);
        setCountries([]);
        setLoading(true);
        setErrorLoading(false);

        const bodyRequest = {
            filters: route?.params.filters, 
            orders: route?.params.orders
        }

        await api.post('filter/country', bodyRequest).then(response => {
            setCountries(response.data.countries);
            setLoading(false);
        }).catch((error) => {
            console.log(error.response.data)
            setLoading(false);
            setErrorLoading(true)
        })
    }

    return (
        <App style={{  }}>
            <BreadCrumb
                itens={[{
                    label: 'Cadastros',
                    route: 'Registrations'
                }, {
                    label: 'Países',
                }]}
            />

            <Card style={{ height: '94%' }} >
                <CardBody>
                    <Table 
                        style={{ height: 600 }} 
                        loading={loading}
                        error={errorLoading}
                        refresh={loadList}
                        title="Países"
                        actions={[{
                            icon: 'filter', 
                            onPress: () => navigation.navigate('FilterCountry', {
                                filters: route.params.filters ?? '', 
                                orders: route.params.orders ?? true
                            })
                        }]}
                    >
                        <TableRow>
                            <TableCell text={'ID'} type={'title'}/>
                            <TableCell text={'Nome'} type={'title'}/>
                            <TableCell text={''} type={'title'}/>
                        </TableRow>
                        { countries
                            .slice(
                                (page - 1) * perPage, 
                                (page - 1) * perPage + perPage
                            )
                            .map(country => (
                            <TableRow key={country.id}>
                                <TableCell text={country.id} />
                                <TableCell text={country.name} />
                                <TableCell>
                                    <Button
                                        style={{ height: 35, marginBottom: 18 }}
                                        label="Editar"
                                        color="rgba(0, 255, 0, 0.5)"
                                        icon="edit"
                                        onPress={() => {
                                            navigation.navigate('FormCountry', { country })
                                        }}
                                    /> 
                                </TableCell>
                            </TableRow>
                        ))}
                        
                    </Table>
                    <TablePaginator
                        rows={countries.length}
                        numberOfPages={countries.length / perPage}
                        atualPage={page}
                        next={() => page < (countries.length / perPage) ? setPage(page + 1) : null }
                        previous={() => page > 1 ? setPage(page - 1) : null }
                    />
                </CardBody>
                <CardFooter style={{ justifyContent: 'space-between' }}>
                    <Button
                        label="Adicionar"
                        color="rgba(0, 255, 0, 0.5)"
                        icon="plus"
                        onPress={() => {
                            navigation.navigate('FormCountry')
                        }}
                    />   
                </CardFooter>
            </Card>
           
        </App>
  );
}