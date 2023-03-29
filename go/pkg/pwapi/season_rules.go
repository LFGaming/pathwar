package pwapi

import (
	"time"

	"gopkg.in/yaml.v3"
)

type SeasonRules struct {
	StartDatetime       time.Time `yaml:"start_datetime"`
	EndDatetime         time.Time `yaml:"end_datetime"`
	LimitPlayersPerTeam int32     `yaml:"limit_players_per_team"`
	LimitTotalTeams     int32     `yaml:"limit_total_teams"`
	EmailDomain         string    `yaml:"email_domain"`
}

func (s *SeasonRules) ParseSeasonRulesString(seasonsRulesYAML []byte) error {
	if err := yaml.Unmarshal(seasonsRulesYAML, s); err != nil {
		return err
	}
	return nil
}

func (s *SeasonRules) IsOpen() bool {
	return s.IsStarted() && !s.IsEnded()
}

func (s *SeasonRules) IsStarted() bool {
	return s.StartDatetime.Unix() > 0 && s.StartDatetime.Unix() <= time.Now().Unix()
}

func (s *SeasonRules) IsEnded() bool {
	return s.EndDatetime.Unix() > 0 && s.EndDatetime.Unix() <= time.Now().Unix()
}

func NewSeasonsRules() SeasonRules {
	return SeasonRules{
		StartDatetime:       time.Now(),
		EndDatetime:         time.Time{},
		LimitPlayersPerTeam: 0,
		LimitTotalTeams:     0,
		EmailDomain:         "",
	}
}
