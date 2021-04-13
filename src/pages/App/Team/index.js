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

export default function Team({ route }) {

    const navigation = useNavigation();

    const [teams, setTeams] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [errorLoading, setErrorLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        loadList();
    }, [route?.params]);

    const loadList = async () => {
        setPage(1);
        setTeams([]);
        setLoading(true);
        setErrorLoading(false);

        const bodyRequest = {
            filters: route?.params.filters, 
            orders: route?.params.orders
        }

        await api.post('filter/team', bodyRequest).then(response => {
            setTeams(response.data.teams);
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
                    label: 'Times',
                }]}
            />

            <Table 
                style={{ height: 600 }} 
                loading={loading}
                error={errorLoading}
                refresh={loadList}
                title="Times"
                actions={[{
                    icon: 'filter', 
                    onPress: () => navigation.navigate('FilterTeam', {
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
                { teams
                    .slice(
                        (page - 1) * perPage, 
                        (page - 1) * perPage + perPage
                    )
                    .map(team => (
                    <TableRow key={team.id}>
                        <TableCell text={team.name} />
                        <TableCell text={team.country.name} />
                        <TableCell>
                            <Button
                                style={{ height: 35, marginBottom: 18, width: 50 }}
                                color="rgba(0, 255, 0, 0.5)"
                                icon="edit"
                                onPress={() => {
                                    navigation.navigate('FormTeam', { team })
                                }}
                            /> 
                        </TableCell>
                    </TableRow>
                ))}
                
            </Table>
            
            <TablePaginator
                rows={teams.length}
                numberOfPages={teams.length / perPage}
                atualPage={page}
                next={() => page < (teams.length / perPage) ? setPage(page + 1) : null }
                previous={() => page > 1 ? setPage(page - 1) : null }
            />

            <Button
                label="Adicionar"
                color="rgba(0, 255, 0, 0.5)"
                icon="plus"
                onPress={() => {
                    navigation.navigate('FormTeam')
                }}
                style={{
                    width: '95%'
                }}
            />   
        </App>
  );
}