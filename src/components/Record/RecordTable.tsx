import React from 'react';
import { StyleSheet } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { format } from 'date-fns';

import { useRecoilValue } from 'recoil';
import { matchByTypeState } from 'src/atoms/MatchAtom';

import { MatchType } from 'src/types';

import {
  ScrollView,
  View,
} from 'native-base';

const RecordTable = (props: any) => {
  const matchType = props.route.params.type
  const matchesByType = useRecoilValue(matchByTypeState(matchType))

  const tableHead = ['日付', '対戦相手', 'スコア', '勝敗', '得点', 'シュート', 'アシスト', '出場時間']
  const widthArr = [80, 100, 60, 50, 50, 60, 60, 60]

  return <View style={styles.container}>
    <ScrollView horizontal={true}>
      <View>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#e0e0e0' }}>
          <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.headerText} />
        </Table>
        <ScrollView style={styles.dataWrapper}>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#e0e0e0' }}>
            {
              matchesByType.map((match: MatchType, index) => {
                const result = (match.teamScore == match.opponentScore) ? "引き分け" : (match.teamScore > match.opponentScore) ? "勝ち" : "負け"
                const rowData = [
                  format(new Date(match.targetDate), 'M月d日'),
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