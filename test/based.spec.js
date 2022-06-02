import { based } from "../core/index"

// test -> date: string   format: 'yyyy-MM-dd'
it.skip('get before day', () => {
  expect(based({
    type: 'day',
    date: '2022-06-02',
    distance: -2,
    format: 'yyyy-MM-dd'
  })).toBe('2022-05-31');
});

// after
it.skip('get after day', () => {
  expect(based({
    type: 'day',
    date: '2022-06-02',
    distance: 2,
    format: 'yyyy-MM-dd'
  })).toBe('2022-06-04');
});


it('get after month', () => {
  expect(based({
    type: 'month',
    date: '2022-06-02',
    distance: 5,
    format: 'yyyy-MM-dd'
  })).toBe('2022-11-02');
});


it('get before month', () => {
  expect(based({
    type: 'month',
    date: '2022-06-02',
    distance: -2,
    format: 'yyyy-MM-dd'
  })).toBe('2022-04-02');
});


it('get before year', () => {
  expect(based({
    type: 'year',
    date: '2022-06-02',
    distance: 3,
    format: 'yyyy-MM-dd'
  })).toBe('2025-06-02');
});


it('get after hour', () => {
  expect(based({
    type: 'hour',
    date: '2022-06-02 11:20:30',
    distance: 4,
    format: 'yyyy-MM-dd HH:mm:ss'
  })).toBe('2022-06-02 15:20:30');
});


it('get before minute', () => {
  expect(based({
    type: 'minute',
    date: '2022-06-02 11:20:30',
    distance: -10,
    format: 'yyyy-MM-dd HH:mm:ss'
  })).toBe('2022-06-02 11:10:30');
});
