import { Autocomplete, TextField } from "@mui/material";
import { useAccounts } from "../../hooks/useAccounts";
import type { Account } from "../../types/Account";

interface AccountAutocompleteProps {
  accountId: string | number | null;
  setAccount?: (account: Account | null) => void;
  setAccountId?: (id: string | number | null) => void;
  label?: string;
}

export default function AccountAutocomplete({
  accountId,
  setAccount,
  setAccountId,
  label,
}: AccountAutocompleteProps) {
  const { data: accounts = [] } = useAccounts() as { data: Account[] };

  const handleChange = (
    _event: React.SyntheticEvent,
    value: Account | null
  ) => {
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
          getOptionLabel={(option: Account) =>
            `${option.lastName}, ${option.firstName} (${option.email})`
          }
          style={{ width: "100%" }}
          renderInput={(params) => (
            <TextField
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
