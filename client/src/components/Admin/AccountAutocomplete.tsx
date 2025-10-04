import { Autocomplete, TextField } from "@mui/material";
import { useAccounts } from "../../hooks/useAccounts";

interface Account {
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
}
interface AccountAutocompleteProps {
  accountId: string | number | null;
  setAccount?: (account: Account | null) => void;
  setAccountId?: (id: string | number | null) => void;
  label?: string;
  name?: string
}

export default function AccountAutocomplete({
  accountId,
  setAccount,
  setAccountId,
  label,
  name
}: AccountAutocompleteProps) {
  const { data: accounts } = useAccounts();

  const handleChange = (_event: unknown,value: Account | null) => {
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
