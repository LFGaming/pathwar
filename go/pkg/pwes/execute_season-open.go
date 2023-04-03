package pwes

import (
	"context"

	"go.uber.org/zap"
	"pathwar.land/pathwar/v2/go/pkg/errcode"
	"pathwar.land/pathwar/v2/go/pkg/pwapi"
)

func (e *EventSeasonOpen) execute(ctx context.Context, apiClient *pwapi.HTTPClient, logger *zap.Logger) error {
	if apiClient == nil {
		logger.Debug("missing apiClient in execute event method")
		return errcode.ErrMissingInput
	}
	logger.Debug("This kind event is not handled yet")
	return nil
}
