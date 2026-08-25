import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Button,
  Toast,
  ToastTitle,
  Toaster,
  useId,
  useToastController,
} from "@fluentui/react-components";
import {
  MicOffRegular,
  MicRegular,
} from "@fluentui/react-icons";
import styles from "./VoiceInput.module.css";

interface VoiceInputProps {
  onTranscript:
  (text: string) => void;

  onInterimTranscript?:
  (text: string) => void;

  onListeningChange?:
  (isListening: boolean) => void;

  disabled?: boolean;
}

function joinTranscripts(
  ...values: Array<
    string | null | undefined
  >
): string {
  return values
    .map((value) => value?.trim())
    .filter(Boolean)
    .join(" ");
}

function getVoiceErrorMessage(
  error: string,
): string {
  const messages:
    Record<string, string> = {
    "not-allowed":
      "El acceso al micrófono fue denegado. Permite el uso del micrófono desde la configuración del sitio.",

    "service-not-allowed":
      "El servicio de reconocimiento de voz está bloqueado por el navegador o por una política de la organización.",

    "no-speech":
      "No se detectó voz. Inténtalo nuevamente.",

    "audio-capture":
      "No se encontró un micrófono disponible o no fue posible capturar el audio.",

    network:
      "El servicio de reconocimiento de voz del navegador no está disponible. Revisa la conexión o las políticas del navegador.",

    "language-not-supported":
      "El idioma configurado no está disponible para el reconocimiento de voz.",
  };

  return (
    messages[error] ??
    `No fue posible procesar la entrada de voz (${error}).`
  );
}

export function VoiceInput({
  onTranscript,
  onInterimTranscript,
  onListeningChange,
  disabled = false,
}: VoiceInputProps) {
  const [
    isListening,
    setIsListening,
  ] = useState(false);

  const recognitionRef =
    useRef<
      SpeechRecognition | null
    >(null);

  const finalTranscriptRef =
    useRef("");

  const toasterId =
    useId("voice-toaster");

  const {
    dispatchToast,
  } = useToastController(
    toasterId,
  );

  const updateListeningState =
    useCallback(
      (
        nextState: boolean,
      ) => {
        setIsListening(nextState);

        onListeningChange?.(
          nextState,
        );
      },
      [
        onListeningChange,
      ],
    );

  const showToast =
    useCallback(
      (
        message: string,
        intent:
          | "error"
          | "warning" = "error",
      ) => {
        dispatchToast(
          <Toast>
            <ToastTitle>
              {message}
            </ToastTitle>
          </Toast>,
          {
            intent,
          },
        );
      },
      [
        dispatchToast,
      ],
    );

  const stopListening =
    useCallback(() => {
      recognitionRef.current?.stop();

      updateListeningState(false);
    }, [
      updateListeningState,
    ]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();

      recognitionRef.current =
        null;
    };
  }, []);

  const toggleListening =
    useCallback(() => {
      if (disabled) {
        return;
      }

      if (
        recognitionRef.current
      ) {
        stopListening();
        return;
      }

      const SpeechRecognitionCtor =
        window.SpeechRecognition ??
        window.webkitSpeechRecognition;

      if (
        !SpeechRecognitionCtor
      ) {
        showToast(
          "La entrada por voz no está disponible en este navegador.",
          "warning",
        );

        return;
      }

      const recognition =
        new SpeechRecognitionCtor();

      recognition.continuous =
        true;

      recognition.interimResults =
        true;

      recognition.lang =
        "es-VE";

      recognition.maxAlternatives =
        1;

      finalTranscriptRef.current =
        "";

      recognition.onstart = () => {
        updateListeningState(true);
      };

      recognition.onresult = (
        event:
          SpeechRecognitionEvent,
      ) => {
        let interimTranscript =
          "";

        for (
          let index =
            event.resultIndex;

          index <
          event.results.length;

          index += 1
        ) {
          const result =
            event.results[index];

          const transcript =
            result[0]?.transcript
              ?.trim();

          if (!transcript) {
            continue;
          }

          if (result.isFinal) {
            finalTranscriptRef.current =
              joinTranscripts(
                finalTranscriptRef.current,
                transcript,
              );
          }
          else {
            interimTranscript =
              joinTranscripts(
                interimTranscript,
                transcript,
              );
          }
        }

        const visibleTranscript =
          joinTranscripts(
            finalTranscriptRef.current,
            interimTranscript,
          );

        onInterimTranscript?.(
          visibleTranscript,
        );
      };

      recognition.onerror = (
        event:
          SpeechRecognitionErrorEvent,
      ) => {
        console.error(
          "[VoiceInput] Recognition error:",
          {
            error:
              event.error,
            message:
              event.message,
          },
        );

        recognitionRef.current =
          null;

        updateListeningState(false);

        onInterimTranscript?.(
          "",
        );

        if (
          event.error !==
          "aborted"
        ) {
          showToast(
            getVoiceErrorMessage(
              event.error,
            ),
          );
        }
      };

      recognition.onend = () => {
        const finalTranscript =
          finalTranscriptRef.current
            .trim();

        recognitionRef.current =
          null;

        updateListeningState(false);

        if (finalTranscript) {
          onTranscript(
            finalTranscript,
          );
        }

        onInterimTranscript?.(
          "",
        );

        finalTranscriptRef.current =
          "";
      };

      recognitionRef.current =
        recognition;

      try {
        recognition.start();
      }
      catch (error) {
        recognitionRef.current =
          null;

        updateListeningState(false);

        console.error(
          "[VoiceInput] Unable to start:",
          error,
        );

        showToast(
          "No fue posible iniciar el reconocimiento de voz.",
        );
      }
    }, [
      disabled,
      onInterimTranscript,
      onTranscript,
      showToast,
      stopListening,
      updateListeningState,
    ]);

  return (
    <>
      <Toaster
        toasterId={toasterId}
        position="top-end"
      />

      <Button
        type="button"
        appearance="subtle"
        icon={
          isListening
            ? (
              <MicOffRegular />
            )
            : (
              <MicRegular />
            )
        }
        onClick={
          toggleListening
        }
        disabled={disabled}
        aria-label={
          isListening
            ? "Detener entrada por voz"
            : "Iniciar entrada por voz"
        }
        aria-pressed={
          isListening
        }
        className={
          `${styles.voiceButton} ${isListening
            ? styles.listening
            : ""
          }`
        }
      >
        {isListening && (
          <span
            className={
              styles.pulsingDot
            }
            aria-hidden="true"
          />
        )}
      </Button>
    </>
  );
}