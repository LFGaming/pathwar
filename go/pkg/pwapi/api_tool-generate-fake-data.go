package pwapi

import (
	"context"

	"pathwar.land/go/v2/pkg/pwdb"
)

func (svc *service) ToolGenerateFakeData(context.Context, *Void) (*Void, error) {
	return &Void{}, pwdb.GenerateFakeData(svc.db, svc.snowflake, svc.logger.Named("generate-fake-data"))
}