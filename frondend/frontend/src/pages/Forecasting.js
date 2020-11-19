import * as React from 'react';
import './Forecasting.css';
import { Form, Page, Grid, Card, colors } from 'tabler-react';
import C3Chart from 'react-c3js';
import SiteWrapper from '../SiteWrapper';

export default function Forecasting(): React.Node {
  const card1 = [
    {
      title: 'LSTM',
      data: {
        columns: [
          // each columns data
          ['data1', 2, 8, 6, 7, 14, 11],
          ['data2', 5, 15, 11, 15, 21, 25],
          ['data3', 17, 18, 21, 20, 30, 29],
        ],
        type: 'line', // default type of chart
        colors: {
          data1: colors.orange,
          data2: colors.blue,
          data3: colors.green,
        },
        names: {
          // name of each serie
          data1: 'Development',
          data2: 'Marketing',
          data3: 'Sales',
        },
      },
      axis: {
        x: {
          type: 'category',
          // name of each category
          categories: ['2013', '2014', '2015', '2016', '2017', '2018'],
        },
      },
    },
  ];
  const card2 = [
    {
      title: 'XGBoost',
      data: {
        columns: [
          // each columns data
          [
            'data1',
            7.0,
            6.9,
            9.5,
            14.5,
            18.4,
            21.5,
            25.2,
            26.5,
            23.3,
            18.3,
            13.9,
            9.6,
          ],
          [
            'data2',
            3.9,
            4.2,
            5.7,
            8.5,
            11.9,
            15.2,
            17.0,
            16.6,
            14.2,
            10.3,
            6.6,
            4.8,
          ],
        ],
        labels: true,
        type: 'line', // default type of chart
        colors: {
          data1: colors.blue,
          data2: colors.green,
        },
        names: {
          // name of each serie
          data1: 'Tokyo',
          data2: 'London',
        },
      },
      axis: {
        x: {
          type: 'category',
          // name of each category
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        },
      },
    },
  ];

  return (
    <>
      <SiteWrapper>
        <Page.Content>
          <div style={{ marginLeft: '12px' }}>
            <Grid.Row>
              <Form.Group label="날자">
                <Form.Select>
                  <option>7일</option>
                  <option>15일</option>
                  <option>30일</option>
                </Form.Select>
              </Form.Group>
              <Form.Group label="나라">
                <Form.Select>
                  <option>미국</option>
                  <option>중국</option>
                  <option>일본</option>
                </Form.Select>
              </Form.Group>
            </Grid.Row>
          </div>

          <Grid.Row>
            {card1.map((chart, i) => (
              <Grid.Col key={i} md={12} xl={12}>
                <Card title={chart.title}>
                  <Card.Body>
                    <C3Chart
                      data={chart.data}
                      axis={chart.axis}
                      legend={{
                        show: false, //hide legend
                      }}
                      padding={{
                        bottom: 0,
                        top: 0,
                      }}
                    />
                  </Card.Body>
                </Card>
              </Grid.Col>
            ))}
          </Grid.Row>

          <Grid.Row>
            {card2.map((chart, i) => (
              <Grid.Col key={i} md={12} xl={12}>
                <Card title={chart.title}>
                  <Card.Body>
                    <C3Chart
                      data={chart.data}
                      axis={chart.axis}
                      legend={{
                        show: false, //hide legend
                      }}
                      padding={{
                        bottom: 0,
                        top: 0,
                      }}
                    />
                  </Card.Body>
                </Card>
              </Grid.Col>
            ))}
          </Grid.Row>
        </Page.Content>
      </SiteWrapper>
    </>
  );
}
