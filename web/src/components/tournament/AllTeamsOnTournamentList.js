import * as React from "react";
import { Card, Table, Dimmer } from "tabler-react";
import PropTypes from "prop-types";

import styles from "../../styles/layout/loader.module.css"

const TeamsRows = ({ teams }) => {
    return teams.map((item) => {
        return (
            <Table.Row key={item.team.id}>
                <Table.Col colSpan={2}>{item.team.name}</Table.Col>
                {/* <Table.Col>{tournament.status}</Table.Col>
                <Table.Col>{tournament.visibility}</Table.Col> */}
            </Table.Row>
        )
    })
}

const AllTeamsOnTournamentList = ({ activeTournament, allTeamsOnTournament }) => {
    return (
        !activeTournament || !allTeamsOnTournament ? <Dimmer className={styles.dimmer} active loader /> :
        <Card>
            <Table
                cards={true}
                striped={true}
                responsive={true}
                className="table-vcenter"
            >
                <Table.Header>
                    <Table.Row>
                        <Table.ColHeader colSpan={2}>Name</Table.ColHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { activeTournament && allTeamsOnTournament &&
                        <TeamsRows
                            teams={allTeamsOnTournament}
                        />
                    }
                </Table.Body>
            </Table>
        </Card>
    )
}

AllTeamsOnTournamentList.propTypes = {
    tournaments: PropTypes.object,
};

export default AllTeamsOnTournamentList;
