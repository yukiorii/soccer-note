import React from 'react';
import { StyleSheet } from 'react-native';
import { Table, Row } from 'react-native-table-component';

import { useRecoilValue } from 'recoil';
import { matchState } from 'src/atoms/MatchAtom';

import { MatchType } from 'src/types';

import {
  ScrollView,
  View,
} from 'native-base';

const RecordTable = (props: any) => {
  const allMatch = useRecoilValue(matchState)
  const reversedMatch = [...allMatch].reverse()

  const tableHead = ['対戦相手', 'スコア', '勝敗', '得点', 'シュート', 'アシスト', '出場時間']
  const widthArr = [100, 60, 50, 50, 60, 60, 60]

  return <View style={styles.container}>
    <ScrollView horizontal={true}>
      <View>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#e0e0e0' }}>
          <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.headerText} />
        </Table>
        <ScrollView style={styles.dataWrapper}>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#e0e0e0' }}>
            {
              reversedMatch.map((match: MatchType, index) => {
                const result = (match.teamScore == match.opponentScore) ? "引き分け" : (match.teamScore > match.opponentScore) ? "勝ち" : "負け"
                const rowData = [
                  match.opponent,
                  match.teamScore + "-" + match.opponentScore,
                  result,
                  match.goal,
                  match.shoot,
                  match.assist,
                  match.playingTime,
                ]
                return <Row
                  key={index}
                  data={rowData}
                  widthArr={widthArr}
                  style={styles.row}
                  textStyle={styles.text}
                />
              })
            }
          </Table>
        </ScrollView>
      </View>
    </ScrollView>
  </View>
}

export default RecordTable;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#f6f6f6' },
  headerText: { textAlign: 'center', fontWeight: '500' },
  text: { textAlign: 'center', fontWeight: '300' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#fff' }
});