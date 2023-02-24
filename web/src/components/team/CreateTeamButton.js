import React, {useEffect, useState} from "react";
import {isEmpty} from "ramda";
import {Button, Form} from "tabler-react";
import {FormattedMessage} from "react-intl";
import {createTeam as createTeamAction} from "../../actions/seasons";
import {useDispatch} from "react-redux";
import {Autocomplete} from "@material-ui/lab";
import {TextField} from "@material-ui/core";

const styles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "0.5rem",
}

const CreateTeamButton = ({organizationID, allSeasons}) => {
  const dispatch = useDispatch();
  const [isFormOpen, setFormOpen] = useState(false);
  const [season, setSeason] = useState("");
  const [error, setError] = useState(false);
  const createTeam = (organizationID, organizationName, name) =>
    dispatch(createTeamAction(organizationID, organizationName, name));

  useEffect(() => {
    if (!isEmpty(season)) {
      setError(false);
    }
  }, [season]);

  const handleFormOpen = event => {
    event.preventDefault();
    setFormOpen(!isFormOpen);
  };

  const submitCreateTeam = async event => {
    event.preventDefault();
    if (isEmpty(season)) {
      setError(true);
    } else {
      await createTeam(organizationID, season, organizationName);
      setFormOpen(false);
    }
  }

  return (
    <div style={styles}>
      <Button
        color="success"
        onClick={handleFormOpen}
        icon={"users"}
        size="sm"
        css={{  display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "0.5rem",
          width: "131px"
      }}
      >
        {"Create new team"}
      </Button>
      {isFormOpen && (
        <form onSubmit={submitCreateTeam}>
          <Form.FieldSet css={styles}>
            <Form.Group isRequired label="Season" css={styles}>
              <Autocomplete
                freeSolo
                autoComplete
                autoHighlight
                onInputChange={(event, newInputValue) => {setSeason(newInputValue)}}
                options={allSeasons ? [] : []}
                css={{width: "213px", backgroundColor: "white", height: "38px"}}
                renderInput={(params) => (
                  <TextField {...params}
                             size="small"
                             variant="outlined"

                  />
                )}
              />
            </Form.Group>
            <Form.Group css={styles}>
              <Button type="submit" color="success" className="ml-auto">
                <FormattedMessage id="CreateTeamButton.send" />
              </Button>
            </Form.Group>
          </Form.FieldSet>
        </form>
      )}
    </div>
  );
}

export default CreateTeamButton;
