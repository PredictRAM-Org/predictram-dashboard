import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, LinearProgress, styled } from '@mui/material';

const WorkflowStep = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.03)',
  marginBottom: theme.spacing(3),
}));

const StepNumber = styled(Box)(({ theme }) => ({
  width: 28,
  height: 28,
  background: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  color: theme.palette.primary.contrastText,
}));

const ResultsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const WorkspacePanel = ({ selectedModel, onSubscribe, onConnect, onTrain }) => {
  const [apiKey, setApiKey] = useState('');
  const [portfolioId, setPortfolioId] = useState('');
  const [epochs, setEpochs] = useState('');
  const [progress, setProgress] = useState({
    connection: 0,
    training: 0
  });
  const [results, setResults] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [subscribedModelName, setSubscribedModelName] = useState(null);

  const handleSubscribe = async () => {
    if (!selectedModel) return;
    try {
      await onSubscribe();
      setSubscribedModelName(selectedModel.name);
    } catch (error) {
      // Handle error if needed
    }
  };

  const isCurrentModelSubscribed = selectedModel && subscribedModelName === selectedModel.name;

  const handleConnect = async () => {
    if (!apiKey || !portfolioId) return;
    
    const progressSteps = [30, 75, 100];
    await progressSteps.reduce(async (promise, step) => {
      await promise;
      setProgress(prev => ({ ...prev, connection: step }));
      await new Promise(resolve => setTimeout(resolve, 500));
    }, Promise.resolve());
    
    await onConnect(apiKey, portfolioId);
    setTimeout(() => setProgress(prev => ({ ...prev, connection: 0 })), 1000);
  };

  const handleTrain = async () => {
    if (!epochs || isTraining) return;
    
    setIsTraining(true);
    try {
      const startTime = Date.now();
      const duration = 5000;

      const updateProgress = () => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min((elapsed / duration) * 100, 100);
        
        setProgress(prev => ({ ...prev, training: currentProgress }));

        if (currentProgress < 100) {
          requestAnimationFrame(updateProgress);
        } else {
          setResults({
            predictedReturns: (Math.random() * 15).toFixed(2),
            riskAssessment: (Math.random() * 10).toFixed(1),
            confidenceScore: (Math.random() * 100).toFixed(1)
          });
          onTrain(epochs);
        }
      };

      requestAnimationFrame(updateProgress);
    } finally {
      setTimeout(() => {
        setIsTraining(false);
        setProgress(prev => ({ ...prev, training: 0 }));
      }, 5000);
    }
  };

  return (
    <Paper sx={{ p: 1 }}>
      <WorkflowStep>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <StepNumber>1</StepNumber>
          <Typography variant="h6">Select & Subscribe</Typography>
        </Box>
        <Box sx={{ 
          p: 2, 
          bgcolor: 'background.paper', 
          mb: 2 
        }}>
          {selectedModel ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography>{selectedModel.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {selectedModel.performance}% accuracy
              </Typography>
            </Box>
          ) : (
            'No model selected'
          )}
        </Box>
        <Button 
          variant="contained" 
          onClick={handleSubscribe}
          fullWidth 
          disabled={!selectedModel || isCurrentModelSubscribed}
          sx={{
            '&:hover': {
              bgcolor: selectedModel ? '#10b981' : 'primary.hover',
            },
            '&.Mui-disabled': {
              bgcolor: selectedModel ? '#10b981' : undefined,
              color: '#fff',
              opacity: 1
            },
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          {isCurrentModelSubscribed ? 'SUBSCRIBED' : 'SUBSCRIBE TO MODEL'}
        </Button>
      </WorkflowStep>

      <WorkflowStep>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <StepNumber>2</StepNumber>
          <Typography variant="h6">Connect Portfolio</Typography>
        </Box>
        <TextField
          fullWidth
          placeholder="Brokerage API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          placeholder="Portfolio ID"
          value={portfolioId}
          onChange={(e) => setPortfolioId(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button 
          variant="contained" 
          fullWidth 
          onClick={handleConnect}
        >
          Secure Connect
        </Button>
        {progress.connection > 0 && (
          <LinearProgress 
            variant="determinate" 
            value={progress.connection} 
            sx={{ mt: 2 }}
          />
        )}
      </WorkflowStep>

      <WorkflowStep>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <StepNumber>3</StepNumber>
          <Typography variant="h6">Train Model</Typography>
        </Box>
        <TextField
          fullWidth
          type="number"
          placeholder="Training Epochs"
          value={epochs}
          onChange={(e) => setEpochs(e.target.value)}
          inputProps={{ min: 1, max: 100 }}
          sx={{ mb: 2 }}
        />
        <Button 
          variant="contained" 
          fullWidth 
          onClick={handleTrain}
          disabled={isTraining}
        >
          {isTraining ? 'Training...' : 'Start Training'}
        </Button>
        {progress.training > 0 && (
          <LinearProgress 
            variant="determinate" 
            value={progress.training} 
            sx={{ mt: 2 }}
          />
        )}
      </WorkflowStep>

      <WorkflowStep>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <StepNumber>4</StepNumber>
          <Typography variant="h6">Results</Typography>
        </Box>
        {results && (
          <ResultsCard>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Predicted Returns</Typography>
              <Typography>+{results.predictedReturns}%</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography>Risk Assessment</Typography>
              <Typography>{results.riskAssessment}/10</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Confidence Score</Typography>
              <Typography>{results.confidenceScore}%</Typography>
            </Box>
          </ResultsCard>
        )}
      </WorkflowStep>
    </Paper>
  );
};

export default WorkspacePanel;
