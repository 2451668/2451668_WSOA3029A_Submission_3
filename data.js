// Fetched Data; a list of the 20 fastest fireballs recorded
/*const fireballsData = {
    signature: {
      source: "NASA/JPL Fireball Data API",
      version: "1.0"
    },
    count: "20",
    fields: [
      "date",
      "energy",
      "impact-e",
      "lat",
      "lat-dir",
      "lon",
      "lon-dir",
      "alt",
      "vel"
    ],
    data: [
      [
        "2008-07-01 17:40:19",
        "3.6",
        "0.12",
        "37.1",
        "N",
        "115.7",
        "W",
        "36.1",
        "9.8"
      ],
      [
        "2018-04-19 13:39:38",
        "51.2",
        "1.3",
        "22.2",
        "S",
        "72.6",
        "E",
        "31.5",
        "10.9"
    ],
    [
        "2020-08-02 16:36:25",
        "7.4",
        "0.23",
        "35.1",
        "S",
        "34.2",
        "W",
        "38.0",
        "11.1"
    ],
    [
        "2018-09-20 18:29:03",
        "8.3",
        "0.26",
        "67.3",
        "S",
        "75.1",
        "E",
        null,
        "11.1"
    ],
    [
        "2014-06-26 05:54:41",
        "6.1",
        "0.2",
        "71.5",
        "S",
        "93.4",
        "E",
        "28.5",
        "11.2"
    ],
    [
        "2008-10-21 02:20:25",
        "4.6",
        "0.15",
        "32.8",
        "N",
        "165.6",
        "W",
        "29.6",
        "11.3"
    ],
    [
        "2019-04-22 21:42:11",
        "12.4",
        "0.37",
        "48.8",
        "S",
        "67.8",
        "E",
        "33.3",
        "11.4"
    ],
    [
        "2017-11-19 04:17:32",
        "2.8",
        "0.098",
        "24.2",
        "S",
        "135.0",
        "E",
        "33.3",
        "11.4"
    ],
    [
        "2019-05-21 13:21:35",
        "65.6",
        "1.6",
        "38.8",
        "S",
        "137.5",
        "E",
        "31.5",
        "11.5"
    ],
    [
        "2018-05-03 07:23:59",
        "3.8",
        "0.13",
        "46.9",
        "N",
        "7.5",
        "W",
        "39",
        "11.5"
    ],
    [
        "2016-01-27 09:59:16",
        "5.0",
        "0.16",
        "45.8",
        "S",
        "53.6",
        "E",
        "37",
        "11.5"
    ],
    [
        "2019-01-22 09:18:01",
        "3.6",
        "0.12",
        "18.0",
        "N",
        "6.5",
        "E",
        "42.5",
        "11.6"
    ],
    [
        "2011-05-25 05:40:02",
        "228.0",
        "4.8",
        "4.1",
        "N",
        "14.0",
        "E",
        "59.0",
        "11.6"
    ],
    [
        "2008-01-09 03:53:15",
        "4.1",
        "0.14",
        "66.8",
        "S",
        "67.3",
        "W",
        "31.5",
        "11.6"
    ],
    [
        "2020-09-18 08:05:27",
        "4.1",
        "0.14",
        "2.4",
        "N",
        "169.7",
        "W",
        "46.0",
        "11.7"
    ],
    [
        "2016-03-03 01:32:43",
        "5.8",
        "0.19",
        "48.0",
        "S",
        "51.0",
        "E",
        "31.8",
        "11.7"
    ],
    [
        "2015-10-10 09:57:51",
        "3.6",
        "0.12",
        "51.0",
        "S",
        "21.1",
        "W",
        "51.8",
        "11.8"
    ],
    [
        "2013-12-08 03:10:09",
        "6.4",
        "0.2",
        "32.8",
        "N",
        "165.1",
        "W",
        "23.5",
        "11.8"
    ],
    [
        "2012-03-12 06:40:44",
        "9.9",
        "0.3",
        "2.5",
        "N",
        "139.8",
        "E",
        "25.0",
        "11.8"
    ],
    [
        "2011-03-01 10:37:54",
        "3.7",
        "0.13",
        "53.5",
        "N",
        "103.9",
        "E",
        "30.6",
        "11.9"
    ]
    
    ]
  };*/
  
  const data = [
    { date: "July 1, 2008", location: "Nevada, United States", velocity: 9.8, energy: 3.6 },
    { date: "April 19, 2018", location: "Indian Ocean", velocity: 10.9, energy: 51.2 },
    { date: "August 2, 2020", location: "Indian Ocean", velocity: 11.1, energy: 7.4 },
    { date: "September 20, 2018", location: "Indian Ocean", velocity: 11.1, energy: 8.3 },
    { date: "June 26, 2014", location: "Indian Ocean", velocity: 11.2, energy: 6.1 },
    { date: "October 21, 2008", location: "Northern Pacific Ocean", velocity: 11.3, energy: 4.6 },
    { date: "April 22, 2019", location: "Southern Indian Ocean", velocity: 11.4, energy: 12.4 },
    { date: "November 19, 2017", location: "Southern Pacific Ocean", velocity: 11.4, energy: 2.8 },
    { date: "May 21, 2019", location: "Southern Indian Ocean", velocity: 11.5, energy: 65.6 },
    { date: "May 3, 2018", location: "United Kingdom", velocity: 11.5, energy: 3.8 },
    { date: "January 27, 2016", location: "Indian Ocean", velocity: 11.5, energy: 5.0 },
    { date: "January 22, 2019", location: "United Arab Emirates", velocity: 11.6, energy: 3.6 },
    { date: "May 25, 2011", location: "India", velocity: 11.6, energy: 228.0 },
    { date: "January 9, 2008", location: "Southern Pacific Ocean", velocity: 11.6, energy: 4.1 },
    { date: "September 18, 2020", location: "South Pacific Ocean", velocity: 11.7, energy: 4.1 },
    { date: "March 3, 2016", location: "Indian Ocean", velocity: 11.7, energy: 5.8 },
    { date: "October 10, 2015", location: "Indian Ocean", velocity: 11.8, energy: 3.6 },
    { date: "December 8, 2013", location: "Southern Pacific Ocean", velocity: 11.8, energy: 6.4 },
    { date: "March 12, 2012", location: "Pacific Ocean", velocity: 11.8, energy: 9.9 },
    { date: "March 1, 2011", location: "Malaysia", velocity: 11.9, energy: 3.7 }
];