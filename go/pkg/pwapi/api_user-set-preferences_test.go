package pwapi

import (
	"context"
	"strconv"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"pathwar.land/pathwar/v2/go/internal/testutil"
	"pathwar.land/pathwar/v2/go/pkg/errcode"
)

func TestService_UserSetPreferences(t *testing.T) {
	svc, cleanup := TestingService(t, ServiceOpts{Logger: testutil.Logger(t)})
	defer cleanup()
	ctx := testingSetContextToken(context.Background(), t)

	// get user session before setting preferences
	beforeSession, err := svc.UserGetSession(ctx, nil)
	require.NoError(t, err)
	seasons := map[string]string{}
	for _, season := range beforeSession.Seasons {
		seasons[season.Season.Name] = strconv.FormatInt(season.Season.ID, 10)
	}

	tests := []struct {
		name                 string
		input                *UserSetPreferences_Input
		expectedErr          error
		expectedSeasonID     string
		expectedTeamMemberID int64
	}{
		{"empty", &UserSetPreferences_Input{}, errcode.ErrMissingInput, seasons["Global"], beforeSession.User.ActiveTeamMemberID},
		{"unknown-season-id", &UserSetPreferences_Input{ActiveSeasonID: "-42"}, errcode.ErrInvalidSeasonID, seasons["Global"], beforeSession.User.ActiveTeamMemberID},
		{"global-mode", &UserSetPreferences_Input{ActiveSeasonID: seasons["Global"]}, nil, seasons["Global"], beforeSession.User.ActiveTeamMemberID},
		{"test-season", &UserSetPreferences_Input{ActiveSeasonID: seasons["Unit Test Season"]}, errcode.ErrUserHasNoTeamForSeason, seasons["Global"], beforeSession.User.ActiveTeamMemberID},
		{"global-mode-again", &UserSetPreferences_Input{ActiveSeasonID: seasons["Global"]}, nil, seasons["Global"], beforeSession.User.ActiveTeamMemberID},
	}

	for _, test := range tests {
		_, err := svc.UserSetPreferences(ctx, test.input)
		testSameErrcodes(t, test.name, test.expectedErr, err)

		session, err := svc.UserGetSession(ctx, nil)
		if assert.NoError(t, err, test.name) {
			expectedSeasonID, _ := strconv.ParseInt(test.expectedSeasonID, 10, 64)
			assert.Equalf(t, expectedSeasonID, session.User.ActiveSeasonID, test.name)
			assert.Equalf(t, test.expectedTeamMemberID, session.User.ActiveTeamMemberID, test.name)
		}
	}
}
