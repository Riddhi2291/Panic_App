import React from 'react';
import {Text as RNText, TouchableOpacity} from 'react-native';
import {findAll} from 'highlight-words-core';

export default function HighlightText({
  autoEscape = true,
  caseSensitive,
  sanitize,
  searchWords,
  textToHighlight,
  highlightStyle,
  highlightComponent,
  textComponent,
  disabled = false,
  ...props
}) {
  const chunks = findAll({
    autoEscape,
    caseSensitive,
    sanitize,
    searchWords,
    textToHighlight,
  });
  const Text = textComponent || RNText;
  const Highlight = highlightComponent || RNText;

  return (
    <Text {...props}>
      {chunks.map((chunk, index) => {
        const text = textToHighlight.substr(
          chunk.start,
          chunk.end - chunk.start,
        );

        return chunk.highlight ? (
          <TouchableOpacity disabled={disabled}>
            <Highlight key={`chunk-${index}`} style={highlightStyle}>
              {text}
            </Highlight>
          </TouchableOpacity>
        ) : (
          text
        );
      })}
    </Text>
  );
}
