import React, {useMemo, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {GlassCard} from '../components/GlassCard';
import {ScreenScroll} from '../components/ScreenScroll';
import {assets, quizSets} from '../data/content';
import {palette} from '../theme';

type Stage = 'intro' | 'question' | 'result';

type Props = {
  onExplore: () => void;
};

export function QuizScreen({onExplore}: Props) {
  const [stage, setStage] = useState<Stage>('intro');
  const [setIndex, setSetIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const quiz = quizSets[setIndex % quizSets.length];
  const question = quiz.questions[questionIndex];
  const progress = (questionIndex + 1) / quiz.questions.length;

  const result = useMemo(() => {
    if (score >= 5) {
      return {
        title: '🏆 Expert Angler',
        text: "Outstanding! You're a true fishin fishing expert.",
      };
    }

    if (score >= 3) {
      return {
        title: '🧊 Strong Catch',
        text: 'Good work. Your winter skills are getting sharp.',
      };
    }

    return {
      title: '📘 Fishin Apprentice',
      text: 'Keep learning - the fishin holds many secrets.',
    };
  }, [score]);

  const start = () => {
    setScore(0);
    setQuestionIndex(0);
    setSelectedIndex(null);
    setStage('question');
  };

  const answer = (index: number) => {
    if (selectedIndex !== null) {
      return;
    }

    setSelectedIndex(index);
    if (index === question.answerIndex) {
      setScore(value => value + 1);
    }
  };

  const next = () => {
    if (questionIndex === quiz.questions.length - 1) {
      setStage('result');
      return;
    }

    setQuestionIndex(value => value + 1);
    setSelectedIndex(null);
  };

  const tryAgain = () => {
    setSetIndex(value => value + 1);
    setStage('intro');
    setScore(0);
    setQuestionIndex(0);
    setSelectedIndex(null);
  };

  const explore = () => {
    setSetIndex(0);
    setStage('intro');
    setScore(0);
    setQuestionIndex(0);
    setSelectedIndex(null);
    onExplore();
  };

  if (stage === 'intro') {
    return (
      <ScreenScroll contentStyle={styles.centerContent}>
        <Image
          source={assets.tentBadge}
          resizeMode="contain"
          style={styles.tentTop}
        />
        <View style={styles.accent} />
        <Text style={styles.introTitle}>Fishin Quiz</Text>
        <Text style={styles.introText}>
          Test your knowledge of fishin fishing safety, species, and techniques.
          5 questions await.
        </Text>
        <View style={styles.statRow}>
          <GlassCard style={styles.statCard}>
            <Text style={styles.statIcon}>❔</Text>
            <Text style={styles.statText}>5 Questions</Text>
          </GlassCard>
          <GlassCard style={styles.statCard}>
            <Text style={styles.statIcon}>⏱</Text>
            <Text style={styles.statText}>~ 3 min</Text>
          </GlassCard>
          <GlassCard style={styles.statCard}>
            <Text style={styles.statIcon}>🏆</Text>
            <Text style={styles.statText}>Get your score</Text>
          </GlassCard>
        </View>
        <Pressable onPress={start} style={styles.startButton}>
          <Text style={styles.startText}>Start Quiz ➜</Text>
        </Pressable>
      </ScreenScroll>
    );
  }

  if (stage === 'result') {
    return (
      <ScreenScroll contentStyle={styles.resultContent}>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreText}>
            {score}/{quiz.questions.length}
          </Text>
          <Text style={styles.percentText}>
            {Math.round((score / quiz.questions.length) * 100)}% correct
          </Text>
        </View>
        <Text style={styles.resultTitle}>{result.title}</Text>
        <Text style={styles.resultText}>{result.text}</Text>
        <View style={styles.resultActions}>
          <Pressable onPress={tryAgain} style={styles.secondaryButton}>
            <Text style={styles.secondaryText}>Try Again</Text>
          </Pressable>
          <Pressable onPress={explore} style={styles.primaryButton}>
            <Text style={styles.primaryText}>Explore</Text>
          </Pressable>
        </View>
        <Image
          source={assets.tentBadge}
          resizeMode="contain"
          style={styles.tentBottom}
        />
      </ScreenScroll>
    );
  }

  return (
    <ScreenScroll contentStyle={styles.questionContent}>
      <View style={styles.quizTop}>
        <View style={styles.questionMeta}>
          <Text style={styles.questionCount}>
            Question {questionIndex + 1} of {quiz.questions.length}
          </Text>
          <Text style={styles.quizTitle}>{quiz.title}</Text>
        </View>
        <Text style={styles.scoreSmall}>Score: {score}</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, {width: `${progress * 100}%`}]} />
      </View>

      <GlassCard style={styles.questionCard}>
        <View style={styles.questionIcon}>
          <Text style={styles.questionEmoji}>?</Text>
        </View>
        <Text style={styles.questionText}>{question.question}</Text>
      </GlassCard>

      <View style={styles.options}>
        {question.options.map((option, index) => {
          const selected = selectedIndex === index;
          const correct = question.answerIndex === index;
          const revealed = selectedIndex !== null;
          const wrong = selected && !correct;

          return (
            <Pressable
              key={option}
              onPress={() => answer(index)}
              style={[
                styles.option,
                selected && styles.optionSelected,
                revealed && correct && styles.optionCorrect,
                wrong && styles.optionWrong,
              ]}>
              <View style={styles.optionLetter}>
                <Text style={styles.optionLetterText}>
                  {revealed && correct
                    ? '✓'
                    : wrong
                    ? '×'
                    : String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text style={styles.optionText}>{option}</Text>
            </Pressable>
          );
        })}
      </View>

      {selectedIndex !== null ? (
        <Pressable onPress={next} style={styles.nextButton}>
          <Text style={styles.nextText}>
            {questionIndex === quiz.questions.length - 1
              ? 'See Result ➜'
              : 'Next Question ➜'}
          </Text>
        </Pressable>
      ) : null}

      <Image
        source={assets.tentBadge}
        resizeMode="contain"
        style={styles.quizTent}
      />
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  centerContent: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  tentTop: {
    height: 128,
    marginBottom: 18,
    width: 128,
  },
  accent: {
    backgroundColor: palette.cyan,
    borderRadius: 2,
    height: 3,
    marginBottom: 14,
    width: 38,
  },
  introTitle: {
    color: palette.text,
    fontSize: 24,
    fontWeight: '900',
  },
  introText: {
    color: palette.muted,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    marginTop: 14,
    maxWidth: 300,
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 38,
  },
  statCard: {
    alignItems: 'center',
    height: 72,
    justifyContent: 'center',
    paddingHorizontal: 8,
    width: 92,
  },
  statIcon: {
    fontSize: 18,
  },
  statText: {
    color: palette.muted,
    fontSize: 10,
    fontWeight: '800',
    marginTop: 6,
    textAlign: 'center',
  },
  startButton: {
    alignItems: 'center',
    backgroundColor: '#13adeb',
    borderRadius: 13,
    height: 58,
    justifyContent: 'center',
    marginTop: 30,
    width: '100%',
  },
  startText: {
    color: palette.text,
    fontSize: 15,
    fontWeight: '900',
  },
  questionContent: {
    flexGrow: 1,
  },
  quizTop: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  questionMeta: {
    flex: 1,
  },
  questionCount: {
    color: palette.cyan,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  quizTitle: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: '800',
    marginTop: 4,
  },
  scoreSmall: {
    color: palette.muted,
    fontSize: 12,
    fontWeight: '800',
  },
  progressTrack: {
    backgroundColor: 'rgba(86, 159, 185, 0.18)',
    borderRadius: 2,
    height: 3,
    marginBottom: 28,
    marginTop: 12,
  },
  progressFill: {
    backgroundColor: palette.cyan,
    borderRadius: 2,
    height: 3,
  },
  questionCard: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    minHeight: 92,
    padding: 18,
  },
  questionIcon: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 209, 255, 0.16)',
    borderColor: palette.line,
    borderRadius: 15,
    borderWidth: 1,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  questionEmoji: {
    color: '#ff2e49',
    fontSize: 17,
    fontWeight: '900',
  },
  questionText: {
    color: palette.text,
    flex: 1,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 22,
  },
  options: {
    gap: 12,
    marginTop: 22,
  },
  option: {
    alignItems: 'center',
    backgroundColor: 'rgba(6, 35, 66, 0.72)',
    borderColor: 'rgba(28, 179, 230, 0.2)',
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 13,
    minHeight: 62,
    paddingHorizontal: 16,
  },
  optionSelected: {
    borderColor: palette.cyan,
  },
  optionCorrect: {
    backgroundColor: 'rgba(0, 190, 198, 0.2)',
    borderColor: palette.cyan,
  },
  optionWrong: {
    backgroundColor: 'rgba(255, 70, 103, 0.19)',
    borderColor: 'rgba(255, 80, 112, 0.56)',
  },
  optionLetter: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 209, 255, 0.18)',
    borderRadius: 13,
    height: 27,
    justifyContent: 'center',
    width: 27,
  },
  optionLetterText: {
    color: palette.text,
    fontSize: 12,
    fontWeight: '900',
  },
  optionText: {
    color: palette.text,
    flex: 1,
    fontSize: 14,
    fontWeight: '900',
  },
  nextButton: {
    alignItems: 'center',
    backgroundColor: '#13adeb',
    borderRadius: 13,
    height: 52,
    justifyContent: 'center',
    marginTop: 24,
  },
  nextText: {
    color: palette.text,
    fontSize: 14,
    fontWeight: '900',
  },
  quizTent: {
    alignSelf: 'center',
    height: 184,
    marginTop: 18,
    width: 184,
  },
  resultContent: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  scoreCircle: {
    alignItems: 'center',
    borderColor: palette.cyan,
    borderRadius: 58,
    borderWidth: 2,
    height: 116,
    justifyContent: 'center',
    shadowColor: palette.cyan,
    shadowOpacity: 0.48,
    shadowRadius: 14,
    width: 116,
  },
  scoreText: {
    color: palette.cyan,
    fontSize: 34,
    fontWeight: '900',
  },
  percentText: {
    color: palette.muted,
    fontSize: 11,
    fontWeight: '800',
  },
  resultTitle: {
    color: palette.cyan,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 28,
    textAlign: 'center',
  },
  resultText: {
    color: palette.muted,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
    marginTop: 8,
    textAlign: 'center',
  },
  resultActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 30,
    width: '100%',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: palette.panel,
    borderColor: palette.line,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    height: 50,
    justifyContent: 'center',
  },
  secondaryText: {
    color: palette.text,
    fontSize: 13,
    fontWeight: '900',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#13adeb',
    borderRadius: 12,
    flex: 1,
    height: 50,
    justifyContent: 'center',
  },
  primaryText: {
    color: palette.text,
    fontSize: 13,
    fontWeight: '900',
  },
  tentBottom: {
    height: 170,
    marginTop: 44,
    width: 170,
  },
});
