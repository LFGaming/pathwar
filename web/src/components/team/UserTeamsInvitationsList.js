import React from "react";
import {Card, Table, Dimmer, Avatar, Button} from "tabler-react";
import PropTypes from "prop-types";

// import styles from "./style.module.css";
import { FormattedMessage } from "react-intl";
import {Link} from "gatsby";
import {useTheme} from "emotion-theming";
import AcceptTeamInviteButton from "./AcceptTeamInviteButton";

const TeamsInvitationsRows = ({ teamsInvitations }) => {
  const currentTheme = useTheme();

  return teamsInvitations.map((item, idx) => {
    return (
      <Table.Row key={item.id}>
        <Table.Col alignContent="center">{item.team.season.name}</Table.Col>

        <Table.Col alignContent="center"
        >
          <Avatar
            className="mr-2"
            imageURL={`${item.team.organization.gravatar_url}?d=identicon`}
          />
          <Link
            className="link"
            to={"/organization/" + item.team.organization.id}
            activeStyle={{
              fontWeight: "bold",
              color: currentTheme.colors.primary,
            }}
          >
            {item.team.organization.name}
          </Link>
        </Table.Col>
        <Table.Col alignContent="center">
          <AcceptTeamInviteButton teamInvite={item} seasonName={item.team.season.name} organizationName={item.team.organization.name}/>
        </Table.Col>
      </Table.Row>
    );
  });
}

const UserTeamsInvitationsList = ({ userTeamsInvitationsList }) => {
  return !userTeamsInvitationsList ? (
    <h3><FormattedMessage id="UserTeamsInvitationsList.NoInvitations" /></h3>
  ) : (
    <Card>
      <Table
        striped={true}
        responsive={true}
        verticalAlign="center"
        className="mb-0"
      >
        <Table.Header>
          <Table.Row>
            <Table.ColHeader alignContent="center">
              <FormattedMessage id="UserTeamsInvitationsList.season" />
            </Table.ColHeader>
            <Table.ColHeader alignContent="center">
              <FormattedMessage id="UserTeamsInvitationsList.organization" />
            </Table.ColHeader>
            <Table.ColHeader alignContent="center">
              <FormattedMessage id="UserTeamsInvitationsList.accept" />
            </Table.ColHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userTeamsInvitationsList && (
            <TeamsInvitationsRows teamsInvitations={userTeamsInvitationsList} />
          )}
        </Table.Body>
      </Table>
    </Card>
  );
};

UserTeamsInvitationsList.propTypes = {
  seasons: PropTypes.object,
};

export default UserTeamsInvitationsList;
