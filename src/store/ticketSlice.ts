import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const CURRENCY_ITEMS = [
  {
    id: 1,
    label: "RUB",
    value: "RUB",
  },
  {
    id: 2,
    label: "USD",
    value: "USD",
  },
  {
    id: 3,
    label: "EUR",
    value: "EUR",
  },
];

const STOPS_ITEMS = [
  {
    id: 1,
    value: 0,
    label: "Без пересадок",
  },
  {
    id: 2,
    value: 1,
    label: "1 пересадка",
  },
  {
    id: 3,
    value: 2,
    label: "2 пересадка",
  },
  {
    id: 4,
    value: 3,
    label: "3 пересадки",
  },
];

type Currency = {
  id: number;
  label: string;
  value: string;
};
export type Stops = {
  id: number;
  value: number;
  label: string;
};
export type Ticket = {
  id: number;
  origin: string;
  origin_name: string;
  destination: string;
  destination_name: string;
  departure_date: string;
  departure_time: string;
  arrival_date: string;
  arrival_time: string;
  carrier: string;
  stops: number;
  price: number;
  currency: string;
};

type TicketState = {
  tickets: Ticket[] | [];
  currencies: Currency[];
  stops: Stops[];
  loading: boolean;
  error: string | null;
  selectedCurrency: string | null;
  selectedStops: number[];
};

export const fetchTickets = createAsyncThunk<Ticket[], undefined, { rejectValue: string }>(
  "tickets/fetchTickets",
  async (_, { rejectWithValue }) => {
    const response = await fetch("/tickets.json");
    if (!response.ok) rejectWithValue("Server error");
    const data = await response.json();

    return data.tickets;
  },
);

const initialState: TicketState = {
  tickets: [],
  loading: false,
  error: null,
  currencies: CURRENCY_ITEMS,
  stops: STOPS_ITEMS,
  selectedCurrency: null,
  selectedStops: [],
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    selectCurrency(state, { payload }: PayloadAction<string>) {
      state.selectedCurrency = payload;
    },
    selectStops(state, { payload }: PayloadAction<number>) {
      if (state.selectedStops) state.selectedStops.push(payload);
    },
    removeStops(state, { payload }: PayloadAction<number>) {
      if (state.selectedStops) {
        state.selectedStops = state.selectedStops.filter((stop) => stop !== payload);
      }
    },
    bulkSelectStop(state, { payload }: PayloadAction<Stops[]>) {
      state.selectedStops = payload.map((stop) => stop.value);
    },
    resetFilters(state, { payload }: PayloadAction<{ currency: null; stops: [] }>) {
      const { currency, stops } = payload;
      state.selectedCurrency = currency;
      state.selectedStops = stops;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending, (state) => {
      state.tickets = [];
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTickets.fulfilled, (state, { payload }) => {
      state.tickets = payload;
      state.loading = false;
    });
    builder.addCase(fetchTickets.rejected, (state, { payload }) => {
      state.loading = true;
      if (payload) state.error = payload;
    });
  },
  selectors: {
    loading: (state) => state.loading,
    error: (state) => state.error,
    getTickets: (state) => state.tickets,
    getStops: (state) => state.stops,
    getCurrencies: (state) => state.currencies,
    getSelectedStops: (state) => state.selectedStops,
    getSelectedCurrency: (state) => state.selectedCurrency,
  },
});

export const { error, loading, getCurrencies, getSelectedCurrency, getSelectedStops, getStops, getTickets } =
  ticketSlice.selectors;

export const { selectCurrency, selectStops, removeStops, bulkSelectStop, resetFilters } = ticketSlice.actions;

export default ticketSlice.reducer;
