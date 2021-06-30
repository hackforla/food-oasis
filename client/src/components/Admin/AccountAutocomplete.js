import React from "react";
import { Autocomplete } from "@material-ui/lab";
import { useAccounts } from "../../hooks/useAccounts/useAccounts";
import Controls from '../UI';

export default function AccountAutocomplete({
  accountId,
  setAccount,
  setAccountId,
  label,
}) {
  const { data: accounts } = useAccounts();

  const handleChange = (event, value) => {
    setAccount && setAccount(value);
    setAccountId && setAccountId(value ? value.id : null);
  };

  return (
    <>
      {accounts ? (
        <Autocomplete
          value={accounts.find((acct) => acct.id === accountId) || null}
          onChange={handleChange}
          options={accounts}
          getOptionLabel={(option) =>
            `${option.lastName}, ${option.firstName} (${option.email})`
          }
          style={{ width: "100%" }}
          renderInput={(params) => (
            <Controls.Input 
              {...params}
              label={label || ""}
              variant="outlined"
              size="small"            
            />
          )}
        />
      ) : null}
    </>
  );
}
