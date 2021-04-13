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
import Chip from '../../../components/Chip';
import CardBody from '../../../components/CardBody';
import CardFooter from '../../../components/CardFooter';

export default function Player({ route }) {

    const navigation = useNavigation();

    const [players, setPlayers] = useState([]);
    
    const [loading, setLoading] = useState(false);
    const [errorLoading, setErrorLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);

    useEffect(() => {
        loadList();
    }, [route?.params]);

    const loadList = async () => {
        setPage(1);
        setPlayers([]);
        setLoading(true);
        setErrorLoading(false);

        const bodyRequest = {
            filters: route?.params.filters, 
            orders: route?.params.orders
        }

        await api.post('filter/player', bodyRequest).then(response => {
            setPlayers(response.data.players);
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
                    label: 'Jogadores',
                }]}
            />

            <Table 
                style={{ height: 600 }} 
                loading={loading}
                error={errorLoading}
                refresh={loadList}
                title="Países"
                actions={[{
                    icon: 'filter', 
                    onPress: () => navigation.navigate('FilterPlayer', {
                        filters: route.params.filters ?? '', 
                        orders: route.params.orders ?? true
                    })
                }]}
            >
                <TableRow>
                    <TableCell text={'Nome'} type={'title'}/>
                    <TableCell text={'Time'} type={'title'}/>
                    <TableCell text={'País'} type={'title'}/>
                    <TableCell text={'Posição'} type={'title'}/>
                    <TableCell text={''} type={'title'}/>
                </TableRow>
                { players
                    .slice(
                        (page - 1) * perPage, 
                        (page - 1) * perPage + perPage
                    )
                    .map(player => (
                    <TableRow key={player.id}>
                        <TableCell text={player.name} />
                        <TableCell text={player.team.name} />
                        <TableCell text={player.country.name} />
                        <TableCell>
                            <Chip 
                                label={player.position}
                                style={{ marginBottom: 18, width: '100%' }}
                                color={
                                    player.position === 'ATA' ? 'rgba(255, 0, 0, 0.7)' : 
                                    player.position === 'MEI' ? 'rgba(0, 255, 0, 0.5)' : 
                                    player.position === 'VOL' ? 'rgba(0, 255, 0, 0.5)' : 
                                    player.position === 'ZAG' ? '#03eeff' :
                                    player.position === 'GOL' ? 'rgba(128, 69, 27, 0.5)' : '#fff'
                                }
                            />
                        </TableCell>
                        <TableCell>
                            <Button
                                style={{ height: 35, marginBottom: 18, width: 50 }}
                                color="rgba(0, 255, 0, 0.5)"
                                icon="edit"
                                onPress={() => {
                                    navigation.navigate('FormPlayer', { player })
                                }}
                            /> 
                        </TableCell>
                    </TableRow>
                ))}
                
            </Table>
            
            <TablePaginator
                rows={players.length}
                numberOfPages={players.length / perPage}
                atualPage={page}
                next={() => page < (players.length / perPage) ? setPage(page + 1) : null }
                previous={() => page > 1 ? setPage(page - 1) : null }
            />

            <Button
                label="Adicionar"
                color="rgba(0, 255, 0, 0.5)"
                icon="plus"
                onPress={() => {
                    navigation.navigate('FormPlayer')
                }}
                style={{
                    width: '95%'
                }}
            />   
        </App>
  );
}